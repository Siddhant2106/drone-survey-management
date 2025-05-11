"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Crosshair, Grid, Layers, MapPin, Pencil, Square, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const FeatureGroup = dynamic(() => import("react-leaflet").then((mod) => mod.FeatureGroup), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false })

// Dynamically import react-leaflet-draw with no SSR
const EditControl = dynamic(() => import("react-leaflet-draw").then((mod) => mod.EditControl), { ssr: false })

type MapViewProps = {
  missionType: string
}

export function MapView({ missionType }: MapViewProps) {
  const { toast } = useToast()
  const [drawMode, setDrawMode] = useState<"none" | "polygon" | "point">("none")
  const [mapReady, setMapReady] = useState(false)
  const [surveyArea, setSurveyArea] = useState<any>(null)
  const [flightPath, setFlightPath] = useState<[number, number][]>([])
  const [mapType, setMapType] = useState<"satellite" | "street">("satellite")
  const mapRef = useRef<any>(null)
  const drawControlRef = useRef<any>(null)

  // Initialize Leaflet when component mounts
  useEffect(() => {
    // This is needed to initialize Leaflet icons
    if (typeof window !== "undefined") {
      // Import Leaflet CSS
      import("leaflet/dist/leaflet.css")
      import("leaflet-draw/dist/leaflet.draw.css")

      // Fix Leaflet default icon issue
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/leaflet/marker-icon-2x.png",
          iconUrl: "/leaflet/marker-icon.png",
          shadowUrl: "/leaflet/marker-shadow.png",
        })
        setMapReady(true)
      })
    }
  }, [])

  // Generate flight path based on survey area and mission type
  const generateFlightPath = () => {
    if (!surveyArea) {
      toast({
        title: "No Survey Area",
        description: "Please define a survey area first by using the polygon tool.",
        variant: "destructive",
      })
      return
    }

    // Get the bounds of the survey area
    const coordinates = surveyArea.geometry.coordinates[0]
    const bounds = coordinates.reduce(
      (acc: any, coord: [number, number]) => {
        return {
          minLng: Math.min(acc.minLng, coord[0]),
          maxLng: Math.max(acc.maxLng, coord[0]),
          minLat: Math.min(acc.minLat, coord[1]),
          maxLat: Math.max(acc.maxLat, coord[1]),
        }
      },
      {
        minLng: Number.POSITIVE_INFINITY,
        maxLng: Number.NEGATIVE_INFINITY,
        minLat: Number.POSITIVE_INFINITY,
        maxLat: Number.NEGATIVE_INFINITY,
      },
    )

    // Generate path based on mission type
    let pathCoordinates: [number, number][] = []

    if (missionType === "grid") {
      // Create a grid pattern
      const latStep = (bounds.maxLat - bounds.minLat) / 10
      let goingRight = true

      for (let lat = bounds.minLat; lat <= bounds.maxLat; lat += latStep) {
        if (goingRight) {
          pathCoordinates.push([bounds.minLng, lat])
          pathCoordinates.push([bounds.maxLng, lat])
        } else {
          pathCoordinates.push([bounds.maxLng, lat])
          pathCoordinates.push([bounds.minLng, lat])
        }
        goingRight = !goingRight
      }
    } else if (missionType === "crosshatch") {
      // Create a crosshatch pattern (grid + perpendicular grid)
      const latStep = (bounds.maxLat - bounds.minLat) / 10
      const lngStep = (bounds.maxLng - bounds.minLng) / 10
      let goingRight = true

      // Horizontal lines
      for (let lat = bounds.minLat; lat <= bounds.maxLat; lat += latStep) {
        if (goingRight) {
          pathCoordinates.push([bounds.minLng, lat])
          pathCoordinates.push([bounds.maxLng, lat])
        } else {
          pathCoordinates.push([bounds.maxLng, lat])
          pathCoordinates.push([bounds.minLng, lat])
        }
        goingRight = !goingRight
      }

      // Vertical lines
      let goingUp = true
      for (let lng = bounds.minLng; lng <= bounds.maxLng; lng += lngStep) {
        if (goingUp) {
          pathCoordinates.push([lng, bounds.minLat])
          pathCoordinates.push([lng, bounds.maxLat])
        } else {
          pathCoordinates.push([lng, bounds.maxLat])
          pathCoordinates.push([lng, bounds.minLat])
        }
        goingUp = !goingUp
      }
    } else if (missionType === "perimeter") {
      // Create a perimeter pattern (just follow the polygon outline)
      pathCoordinates = [...coordinates]
    }

    setFlightPath(pathCoordinates)

    toast({
      title: "Flight Path Generated",
      description: `Created a ${missionType} pattern with ${pathCoordinates.length} waypoints.`,
    })
  }

  const clearArea = () => {
    if (drawControlRef.current) {
      // Clear all layers
      const leafletElement = drawControlRef.current.leafletElement
      if (leafletElement && leafletElement._toolbars && leafletElement._toolbars.edit) {
        const editableLayers = leafletElement._toolbars.edit._featureGroup
        editableLayers.clearLayers()
      }
    }

    setSurveyArea(null)
    setFlightPath([])

    toast({
      title: "Area Cleared",
      description: "Survey area and flight path have been cleared.",
    })
  }

  const getFlightPathPattern = () => {
    switch (missionType) {
      case "grid":
        return <Grid className="h-5 w-5" />
      case "crosshatch":
        return <Crosshair className="h-5 w-5" />
      case "perimeter":
        return <Square className="h-5 w-5" />
      default:
        return <Grid className="h-5 w-5" />
    }
  }

  const handleCreated = (e: any) => {
    const { layerType, layer } = e

    if (layerType === "polygon") {
      // Convert Leaflet layer to GeoJSON
      const geoJson = layer.toGeoJSON()
      setSurveyArea(geoJson)

      toast({
        title: "Survey Area Defined",
        description: "You can now generate a flight path for this area.",
      })
    }
  }

  const handleDeleted = () => {
    setSurveyArea(null)
    setFlightPath([])
  }

  // Only render the map on the client side
  if (!mapReady) {
    return (
      <div className="relative h-full w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full bg-gray-100 dark:bg-gray-800">
      <MapContainer
        center={[40.7128, -74.006]} // Default to NYC
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        {/* Tile layers */}
        {mapType === "satellite" ? (
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            attribution="&copy; Google Maps"
            maxZoom={20}
          />
        ) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />
        )}

        {/* Drawing tools */}
        <FeatureGroup>
          <EditControl
            ref={drawControlRef}
            position="topright"
            onCreated={handleCreated}
            onDeleted={handleDeleted}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: drawMode === "point",
              polyline: false,
              polygon: drawMode === "polygon",
            }}
          />
        </FeatureGroup>

        {/* Flight path */}
        {flightPath.length > 0 && (
          <>
            <Polyline
              positions={flightPath.map((coord) => [coord[1], coord[0]])}
              color="#FF9800"
              weight={3}
              dashArray="5,5"
            />

            {/* Waypoint markers */}
            {flightPath.map((coord, index) => (
              <Marker key={index} position={[coord[1], coord[0]]}>
                <Popup>Waypoint {index + 1}</Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          variant={drawMode === "polygon" ? "default" : "secondary"}
          size="icon"
          onClick={() => setDrawMode(drawMode === "polygon" ? "none" : "polygon")}
          title="Draw Survey Area"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant={drawMode === "point" ? "default" : "secondary"}
          size="icon"
          onClick={() => setDrawMode(drawMode === "point" ? "none" : "point")}
          title="Add Waypoint"
        >
          <MapPin className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={clearArea} title="Clear Area">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setMapType(mapType === "satellite" ? "street" : "satellite")}
          title="Toggle Map Style"
        >
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Flight Path Pattern Indicator */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-background/80 backdrop-blur-sm p-3 rounded-lg border shadow-sm">
        <div className="flex items-center gap-2">
          <div>{getFlightPathPattern()}</div>
          <div>
            <div className="text-sm font-medium capitalize">{missionType} Pattern</div>
            <div className="text-xs text-muted-foreground">
              {surveyArea
                ? flightPath.length > 0
                  ? `${flightPath.length} waypoints`
                  : "Ready to generate path"
                : "Draw an area to start"}
            </div>
          </div>
        </div>
      </div>

      {/* Draw Instructions */}
      {drawMode !== "none" && (
        <div className="absolute top-4 left-4 z-[1000] bg-background/80 backdrop-blur-sm p-3 rounded-lg border shadow-sm max-w-xs">
          <p className="text-sm">
            {drawMode === "polygon"
              ? "Click to create polygon vertices. Complete the shape by clicking on the first point."
              : "Click to place waypoints on the map."}
          </p>
        </div>
      )}
    </div>
  )
}
