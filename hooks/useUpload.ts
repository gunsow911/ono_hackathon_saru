import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import {ExifParserFactory} from "ts-exif-parser"
dayjs.extend(utc)
dayjs.extend(timezone)

const useUpload = () => {
  const upload = async (file: File) => {
    return file.arrayBuffer().then((value) => {
      const exifData = ExifParserFactory.create(value).parse()
      const lat = exifData.tags?.GPSLatitude
      const lng = exifData.tags?.GPSLongitude
      if (!lat || !lng) return Promise.reject()
      return  {
        lat: lat.toString(),
        lng: lng.toString(),
        date: '2022-01-01 00:00:00',
      }
    }).then(({lat, lng, date}) => {
      return postData(lat, lng, date)
    })
  }

  const postData = async (lat: string, lng: string, date: string): Promise<void> => {
      const url = "https://script.google.com/macros/s/AKfycbxxulXc2WYyEGODo9Kh6xSG_xDJDSipOL2YbsDp_6wPfq5BxBqadzLmYTxCnS_xkyW4jA/exec"
      var form = new FormData()
      form.append('lat', lat)
      form.append('lng', lng)
      form.append('date', date)
      return fetch(url, {
        method: "POST",
        body: form 
        }).then((_) => {
          return Promise.resolve();
        });
  }

  return {
    upload,
  }
}

export default  useUpload


