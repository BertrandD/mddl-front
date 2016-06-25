 export default function (num) {
     console.log(new Intl.NumberFormat().format(num));
     return new Intl.NumberFormat().format(num)
 }