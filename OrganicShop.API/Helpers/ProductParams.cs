namespace OrganicShop.API.Helpers
{
    public class ProductParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        public string Title { get; set; }

        public string CategoryId { get; set; }

        public double MinPrice { get; set; } = 0.1;

        public double MaxPrice { get; set; } = 99;

        public string OrderBy { get; set; }
        
    }
}