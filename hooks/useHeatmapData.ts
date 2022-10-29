import {useEffect, useState} from "react"
import Papa from "papaparse"
import {LatLng} from "leaflet"

export type Information = {
  latLng: LatLng,
  date: Date,
}

const useHeatmapData = () => {
  const [informations, setInformations] = useState<Information[]>()

  useEffect(() => {
    load()
  }, [])

  const load = () => {
    fetch("/assets/data.csv")
      .then(res => res.text())
      .then(text => {
        const results = Papa.parse(text ,{
          header: false,
        })
        const infos = results.data.map<Information>((d) => {
          const row = d as any[]
          const latLng = new LatLng(row[0], row[1])
          const date = row[2]
          return {
            latLng,
            date,
          }
        })
        setInformations(infos) 
      })
  }


  return {
    data: informations,
    fetch: load
  }
}

export default  useHeatmapData
