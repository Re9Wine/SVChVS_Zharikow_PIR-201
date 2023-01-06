#nullable disable

namespace ishop.Domain.Entity
{
    public partial class Sneaker
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public string Photo { get; set; }
        public int Count { get; set; }
    }
}
