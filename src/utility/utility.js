export const readMoreData = (description) => {
  return description?.trim()?.length > 300
    ? description?.slice(0, 300) + "..."
    : description;
};

export const Capitalize = (str) =>{
  return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

export const toFeet = (n) => {
  let realFeet = ((n*10*0.393700) / 12);
  let feet = Math.floor(realFeet);
  let inches = Math.round((realFeet - feet) * 12);
  return feet + "'" + inches + '"';
}