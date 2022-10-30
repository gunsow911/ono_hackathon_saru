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
    loadSpreadSheet()
  }

  const loadLocalFile = () => {
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

  const loadSpreadSheet = () => {
    const url = "https://script.google.com/macros/s/AKfycbxxulXc2WYyEGODo9Kh6xSG_xDJDSipOL2YbsDp_6wPfq5BxBqadzLmYTxCnS_xkyW4jA/exec"
    fetch(url).then((res) => res.json())
    .then(value => {
      const data = value as {lat: number, lng: number, date: string}[]
      const infos = data.map<Information>(v => {
        return {
          latLng: new LatLng(v.lat, v.lng),
          date: new Date(v.date)
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
