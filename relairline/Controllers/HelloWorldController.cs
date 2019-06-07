using System.Web;
using System.Web.Mvc;

namespace relairline.Controllers
{
    public class HelloWorldController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}