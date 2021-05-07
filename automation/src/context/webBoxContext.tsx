import { ReactNode, useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

type WebBoxContextData = {
  btnStatus_instiglio: string;
  btnStatus_social: string;
  btnStatus_sector: string;
  btnStatus_lab: string;
  toggleBtn: (btnStatus: string, title: string) => void;
}

export const WebBoxContext = createContext({} as WebBoxContextData)

type WebBoxContextProviderProps = {
  children: ReactNode,
}

export function WebBoxContextProvider({ children }: WebBoxContextProviderProps) {
  const [btnStatus_instiglio, setBtnInstiglioStatus] = useState("unselected")
  const [btnStatus_social, setBtnSocialStatus] = useState("unselected")
  const [btnStatus_sector, setBtnSectorStatus] = useState("unselected")
  const [btnStatus_lab, setBtnLabStatus] = useState("unselected")



  function toggleBtn(btnStatus, title) {

    var new_state = "selected"
    if (btnStatus == "selected") { new_state = "unselected" }

    if (title == 'Social Finance') {
      setBtnSocialStatus(new_state)
    }

    else if (title == 'Instiglio') {
      setBtnInstiglioStatus(new_state)
    }

    else if (title == 'Third Sector') {
      setBtnSectorStatus(new_state)
    }

    else if (title == 'Go Lab') {
      setBtnLabStatus(new_state)
    }
  }

  return (
    <WebBoxContext.Provider value={{
      btnStatus_instiglio,
      btnStatus_social,
      btnStatus_sector,
      btnStatus_lab,
      toggleBtn
    }}>
      {children}
    </WebBoxContext.Provider>
  )
}

export const useWebBox = () => {
  return useContext(WebBoxContext)
}
