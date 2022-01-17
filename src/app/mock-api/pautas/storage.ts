export const getStorage = (nome: string, objeto: any): any => {
  const storage = JSON.parse(localStorage.getItem(nome));
  return storage? storage : objeto;
};

export const setStorage = (nome: string, objeto: any): void => {
  localStorage.setItem(nome, JSON.stringify(objeto));
};
