using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(relairline.Startup))]
namespace relairline
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
