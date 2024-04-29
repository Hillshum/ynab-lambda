
const getStartOfMonth = () => {
    const currentDate = new Date();
    console.log(currentDate)
    console.log(currentDate.getDate())

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const threashold = new Date(year, month, 1);


    return threashold;
}

export {
    getStartOfMonth,
}