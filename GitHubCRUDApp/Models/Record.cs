using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitHubCRUDApp.Models
{
    public class Record<T>
    {
        public T Value
        {
            get;
            set;
        }

        public int Rating
        {
            get;
            set;
        }

        public string Comment
        {
            get;
            set;
        }
    }
}