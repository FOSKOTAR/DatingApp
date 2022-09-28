using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            //coge el dia de hoy
            var today = DateTime.Today;
            //hace un calculo aproximado de la edad restando año actual y año de nacimiento
            var age = today.Year - dob.Year;
            //si el dia, mes y año de nacimiento es mayor que la fecha actual menos 
            //  el calculo de edad aproximado, se le resta 1 porque siginifac que no los ha
            //cumplido todavia
            if(dob.Date > today.AddYears(-age)) age--;
            //se devuelve la edad calculada
            return age;
        }
    }
}