export const phoneMask = (value: string) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
      .replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígito
  };
  
  export const cpfMask = (value: string) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };
  
  export const cepMask = (value: string) => {
    return value
      .replace(/\D/g, "") //Remove tudo o que não é dígito
      .replace(/^(\d{5})(\d)/, "$1-$2"); //Coloca traço entre o quinto e o sexto dígitos
  };
  
  export const cnpjMask = (value: string) => {
    return value
      .replace(/\D/g, "") //Remove tudo o que não é dígito
      .replace(/^(\d{2})(\d)/, "$1.$2") //Coloca ponto entre o segundo e o terceiro dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
      .replace(/\.(\d{3})(\d)/, ".$1/$2") //Coloca uma barra entre o oitavo e o nono dígitos
      .replace(/(\d{4})(\d)/, "$1-$2"); //Coloca um hífen depois do bloco de quatro dígitos
  };
  
  export const creditCardSpacesMask = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo o que  não é dígito
      .replace(/(\d{4})(\d)/, "$1 $2") // Coloca espaço entre o quarto e quinto número
      .replace(/(\d{4})(\d)/, "$1 $2") // Coloca espaço entre o oitavo e quinto nono
      .replace(/(\d{4})(\d)/, "$1 $2"); // Coloca espaço entre o décimo segundo e décimo terceiro  número
  };
  
  export const removeSpace = (value: string) => {
    return value.replace(/\D/g, ""); // Remove tudo o que não é dígito
  };
  
  export const dateCreditCard = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo o que  não é dígito
      .replace(/(\d{2})(\d)/, "$1/$2"); // Adiciona uma barra entre o segundo e terceiro dígito
  };
  
  export const dateNascMask = (value: string) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, "$1/$2") //Coloca parênteses em volta dos dois primeiros dígitos
      .replace(/(\d{2})(\d)/, "$1/$2"); //Coloca hífen entre o quarto e o quinto dígito
  };
  
  export const dateServerMask = (value: string) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, "$1-$2") //Coloca parênteses em volta dos dois primeiros dígitos
      .replace(/(\d{2})(\d)/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígito
  };
  
  export const Hora = (value: string) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, "$1:$2"); //Coloca parênteses em volta dos dois primeiros dígitos
  };
  
  export const moeda = (value: string | number | undefined) => {
    let str = value ? value.toString() : '';
  
    if(typeof value == "number")
      return value
        .toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        .replace("R$", '')
        .trim()
  
  
    return str
      .replace(/\D/g, "") // permite digitar apenas numero
      .replace(/(\d{1})(\d{14})$/, "$1.$2") // coloca ponto antes dos ultimos digitos
      .replace(/(\d{1})(\d{11})$/, "$1.$2") // coloca ponto antes dos ultimos 11 digitos
      .replace(/(\d{1})(\d{8})$/, "$1.$2") // coloca ponto antes dos ultimos 8 digitos
      .replace(/(\d{1})(\d{5})$/, "$1.$2") // coloca ponto antes dos ultimos 5 digitos
      .replace(/(\d{1})(\d{1,2})$/, "$1,$2"); // coloca virgula antes dos ultimos 2 digitos
  };
  
  export const areaComPonto = (value: string) => {
    return value
      .replace(/\D/g, "") // permite digitar apenas numero
      .replace(/(\d{1})(\d{9})$/, "$1.$2") // coloca ponto antes dos ultimos 9 digitos
      .replace(/(\d{1})(\d{6})$/, "$1.$2") // coloca ponto antes dos ultimos 6 digitos
      .replace(/(\d{1})(\d{3})$/, "$1.$2"); // coloca ponto antes dos ultimos 3 digitos
  };
  
  export const moedaFloat = (value: string) => {
    if(!value.includes(","))
      return parseFloat(value).toFixed(2)
      
    return value
      .replace(/\D/g, "") // permite digitar apenas numero
      .replace(/(\d{1})(\d{1,2})$/, "$1.$2"); // coloca virgula antes dos ultimos 2 digitos
  };
  
  export const area = (value: string) => {
    return value.replace(/\D/g, ""); // permite digitar apenas numero
  };
  
  export const revertMask = (value: string) => {
    return value.replace(/\D/g, ""); // substitui qualquer caracter que nao seja numero por nada
  };
  