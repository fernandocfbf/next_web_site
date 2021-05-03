function process(date){

  var date = new Date(date).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
  })

  var parts = date.toString().split("/");

  return new Date(parts[2], parts[1] - 1, parts[0]);
}

export default process