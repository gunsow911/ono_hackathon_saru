import { useEffect, useState } from "react";

export type Information = {
  coordinate: [number, number];
  date: Date;
};

const useHeatmapData = () => {
  const [informations, setInformations] = useState<Information[]>();

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    loadSpreadSheet();
  };

  const loadSpreadSheet = () => {
    const url =
      "https://script.google.com/macros/s/AKfycbxxulXc2WYyEGODo9Kh6xSG_xDJDSipOL2YbsDp_6wPfq5BxBqadzLmYTxCnS_xkyW4jA/exec";
    fetch(url)
      .then((res) => res.json())
      .then((value) => {
        const data = value as { lat: number; lng: number; date: string }[];
        const infos = data.map<Information>((v) => {
          return {
            coordinate: [v.lng, v.lat],
            date: new Date(v.date),
          };
        });
        setInformations(infos);
      });
  };

  return {
    data: informations,
    fetch: load,
  };
};

export default useHeatmapData;
