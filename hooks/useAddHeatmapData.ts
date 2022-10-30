const useAddHeatmapData = () => {
  const postData = async (lat: string, lng: string, date: string): Promise<void> => {
      const url = "https://script.google.com/macros/s/AKfycbxxulXc2WYyEGODo9Kh6xSG_xDJDSipOL2YbsDp_6wPfq5BxBqadzLmYTxCnS_xkyW4jA/exec"
      var form = new FormData()
      form.append('lat', lat)
      form.append('lng', lng)
      form.append('date', date)
      return fetch(url, {
        method: "POST",
        body: form 
        }).then((res) => {
          return;
        });
  }

  return {
    postData,
  }
}

export default  useAddHeatmapData

