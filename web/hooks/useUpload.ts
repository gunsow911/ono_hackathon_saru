import dayjs, {Dayjs} from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import {useState} from "react"
dayjs.extend(utc)
dayjs.extend(timezone)

const useUpload = () => {

  const [loading, setLoading] = useState(false)

  const upload = async (lat: number, lng: number, date: Dayjs): Promise<void> => {
      setLoading(true)
      const url = "https://script.google.com/macros/s/AKfycbxxulXc2WYyEGODo9Kh6xSG_xDJDSipOL2YbsDp_6wPfq5BxBqadzLmYTxCnS_xkyW4jA/exec"
      var form = new FormData()
      form.append('lat',lat.toString())
      form.append('lng', lng.toString())
      form.append('date', date.format('YYYY-MM-DD HH:mm:ss'))
      return fetch(url, {
        method: "POST",
        body: form 
        }).then((_) => {
          return Promise.resolve();
        }).finally(() => {
          setLoading(true)
        });
  }

  return {
    upload,
    loading,
  }
}

export default useUpload


