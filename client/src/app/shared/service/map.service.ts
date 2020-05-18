import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
providedIn: 'root'
})
export class MapService {
on(arg0: string, arg1: (event: any) => void) {
    throw new Error("Method not implemented.");
}
map: mapboxgl.Map;
marker : mapboxgl.Marker ;
style = 'mapbox://styles/mapbox/streets-v11';
//lat = 33.886917;
//lng = 9.537499;
zoom = 6
 

constructor() {
  mapboxgl.accessToken = environment.mapbox.accessToken;
}
buildMap(lat, lng ,title) {
  this.map = new mapboxgl.Map({
    container: 'map',
    style: this.style,
    zoom: this.zoom,
    center: [lng, lat]
  })
 this.map.addControl(new mapboxgl.NavigationControl());
 this.marker = new mapboxgl.Marker()
 .setLngLat([lng,lat])
 .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
 .setHTML('<h3>' + title + '</h3>'))
 .addTo(this.map);



}

}