using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class CreateOrderDto
    {
        public bool SaveAdress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}
