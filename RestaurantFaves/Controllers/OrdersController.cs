using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantFaves.Models;

namespace RestaurantFaves.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {

        FoodDbContext DbContext = new FoodDbContext();

        [HttpGet()]
        public IActionResult GetAll(string? r = null, bool? orderAgain = null)
        {
            List<Order> result = DbContext.Orders.ToList();
            if(r != null) { result = result.Where(x => x.Restaurant.ToLower().Contains(r.ToLower())).ToList();
            }
            if(orderAgain != null)
            {
                result = result.Where(x => x.OrderAgain ==  orderAgain).ToList();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            Order result = DbContext.Orders.Find(id);
            if(result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost()]
        public IActionResult AddOrder([FromBody] Order newOrder)
        {
            newOrder.Id = 0;
            DbContext.Orders.Add(newOrder);
            DbContext.SaveChanges();
            return Created($"/Orders/api/{newOrder.Id}", newOrder);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] Order updateOrder)
        {
            if(updateOrder.Id != id) { return BadRequest(); }
            if(!DbContext.Orders.Any(o=> o.Id == id)) { return NotFound(); }
            DbContext.Orders.Update(updateOrder);
            DbContext.SaveChanges();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            Order result = DbContext.Orders.Find(id);
            if (result == null)
            {
                return NotFound();
            }
            DbContext.Orders.Remove(result);
            DbContext.SaveChanges();
            return NoContent();

        }
    }
}
