function resumeImport(arrayJson){

    const cloned = JSON.parse(JSON.stringify(arrayJson))
  
    //percorre todos os dados
    for(var i=0; i<cloned.length; i++){
  
        const json_atual = cloned[i] //pega o json atual
  
        //corta as informações para nao ocuparem muito espaço
        json_atual['id'] = i
        json_atual['Manchete'] = json_atual['Manchete']
        json_atual['Link'] = json_atual['Link']
        json_atual['Fonte'] = json_atual['Fonte']
    }
  
    return cloned
  }
  
  export default resumeImport