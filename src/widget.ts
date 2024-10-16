import mapboxgl, { Map, Marker, Popup, NavigationControl } from 'mapbox-gl';

export interface MapWidgetOptions {
  accessToken: string;
  center?: [number, number];
  zoom?: number;
  style?: string;
}

export class MapWidget {
  private containerId: string;
  private options: MapWidgetOptions;
  private map: Map | null = null;
  private markers: Marker[] = [];

  constructor(containerId: string, options: MapWidgetOptions) {
    this.containerId = containerId;
    this.options = options;
    this.initMap();
  }

  private initMap(): void {
    this.map = new mapboxgl.Map({
      container: this.containerId,
      accessToken: this.options.accessToken,
      style: this.options.style || 'mapbox://styles/mapbox/streets-v11',
      center: this.options.center || [0, 0],
      zoom: this.options.zoom || 2
    });

    this.map.addControl(new NavigationControl());

    this.map.on('load', () => {
      this.map?.resize();
    });
  }

  public addMarker(lat: number, lng: number, label: string): void {
    const marker = new Marker()
      .setLngLat([lng, lat])
      .setPopup(new Popup().setHTML(`<h3>${label}</h3>`))
      .addTo(this.map!);
    this.markers.push(marker);
  }

  public removeMarker(marker: Marker): void {
    marker.remove();
    this.markers = this.markers.filter(m => m !== marker);
  }

  public flyTo(location: [number, number]): void {
    this.map?.flyTo({
      center: location,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  }

  public toggleStyle(style: string): void {
    this.map?.setStyle(style);
  }

  public async plotRoute(start: [number, number], end: [number, number]): Promise<void> {
    const directionsResponse = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${this.options.accessToken}`);
    const data = await directionsResponse.json();
    const route: number[][] = data.routes[0].geometry.coordinates;

    this.map?.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': route
          },
          'properties': null,
        }
      },
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });
  }
}

export default MapWidget;
