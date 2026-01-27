const Menu = () => {
  const flavors = [
    {
      name: "Simple Vanilla Ice Cream",
      ingredients: ["whole milk", "granulated sugar", "salt flakes", "heavy cream", "pure vanilla extract"]
    },
    {
      name: "Simple Chocolate Ice Cream",
      ingredients: ["cocoa powder", "granulated sugar", "dark brown sugar", "salt flakes", "whole milk", "heavy cream", "pure vanilla extract"]
    },
    {
      name: "Butter Pecan Ice Cream",
      ingredients: ["unsalted butter", "pecans", "salt flakes", "whole milk", "granulated sugar", "heavy cream", "pure vanilla extract"]
    },
    {
      name: "Fresh Strawberry Ice Cream",
      ingredients: ["fresh ripe strawberries", "whole milk", "granulated sugar", "salt flakes", "heavy cream", "pure vanilla extract"]
    },
    {
      name: "Peanut Butter Cup Ice Cream",
      ingredients: ["peanut butter", "granulated sugar", "whole milk", "heavy cream", "pure vanilla extract", "Reese's Peanut Butter Cups"]
    },
    {
      name: "S'mores Ice Cream",
      ingredients: ["cocoa powder", "granulated sugar", "dark brown sugar", "salt flakes", "whole milk", "heavy cream", "pure vanilla extract", "mini marshmallows", "digestive biscuits", "chocolate chips"]
    },
    {
      name: "Banana Walnut Chip Ice Cream",
      ingredients: ["heavy cream", "whole milk", "pure vanilla extract", "salt flakes", "dark brown sugar", "water", "unsalted butter", "bananas", "dark rum", "fresh lemon juice", "bittersweet chocolate chips", "toasted walnuts"]
    },
    {
      name: "Vanilla Bean Ice Cream",
      ingredients: ["whole milk", "heavy cream", "granulated sugar", "salt flakes", "vanilla bean", "egg yolks", "pure vanilla extract"]
    },
    {
      name: "Fresh Mint and Chocolate Cookies Ice Cream",
      ingredients: ["whole milk", "heavy cream", "granulated sugar", "salt flakes", "pure vanilla extract", "fresh mint leaves", "egg yolks", "chocolate sandwich cookies"]
    },
    {
      name: "Mexican-Style Chocolate Ice Cream",
      ingredients: ["whole milk", "heavy cream", "granulated sugar", "pure vanilla extract", "ground cinnamon", "cayenne", "salt flakes", "egg yolks", "bittersweet chocolate"]
    },
    {
      name: "Salted Caramel Ice Cream",
      ingredients: ["whole milk", "heavy cream", "granulated sugar", "salt flakes", "pure vanilla extract", "egg yolks", "water", "unsalted butter", "flaked sea salt"]
    },
    {
      name: "Dark Chocolate Sorbet",
      ingredients: ["water", "granulated sugar", "salt flakes", "cocoa powder", "pure vanilla extract"]
    },
    {
      name: "Grapefruit and Prosecco Sorbet",
      ingredients: ["water", "granulated sugar", "grapefruit zest", "salt flakes", "fresh grapefruit juice", "Prosecco"]
    },
    {
      name: "Dairy-Free Vanilla Ice Cream",
      ingredients: ["dairy-free milk", "tapioca flour", "granulated sugar", "salt flakes", "pure vanilla extract"]
    },
    {
      name: "Coconut-Chocolate Ice Cream",
      ingredients: ["cocoa powder", "granulated sugar", "light brown sugar", "salt flakes", "coconut milk", "pure vanilla extract"]
    },
    {
      name: "Rich Vanilla Frozen Yogurt",
      ingredients: ["water", "honey", "vanilla beans", "whole-milk Greek yogurt", "pure vanilla extract", "granulated sugar", "salt flakes"]
    },
    {
      name: "Mango Frozen Yogurt",
      ingredients: ["whole-milk plain Greek yogurt", "granulated sugar", "salt flakes", "mango pieces", "fresh lime juice"]
    },
    {
      name: "Chocolate-Pretzel Frozen Yogurt",
      ingredients: ["whole-milk plain Greek yogurt", "milk", "granulated sugar", "cocoa powder", "salt flakes", "pure vanilla extract", "chocolate-covered pretzels"]
    },
    {
      name: "Chocolate-Hazelnut Gelato",
      ingredients: ["heavy cream", "whole milk", "granulated sugar", "cornstarch", "salt flakes", "chocolate-hazelnut spread", "hazelnuts"]
    },
    {
      name: "Espresso Gelato",
      ingredients: ["whole milk", "heavy cream", "brewed espresso", "granulated sugar", "cornstarch", "salt flakes", "liquid pectin"]
    },
    {
      name: "Custard Gelato",
      ingredients: ["whole milk", "heavy cream", "pure vanilla extract", "salt flakes", "cornstarch", "egg yolks", "granulated sugar"]
    }
  ];

  return (
    <div className="about">
      <div className="menu-welcome">
        <p>Welcome to Melrose Rock Creamery! Our tasting room is open from 10am - 2pm and 6pm - 11pm every day.</p>
        <h2 style={{ textAlign: 'center', margin: '1rem 0 0' }}>Available Flavors</h2>
      </div>
      <div className="menu-scroll">
        <ul className="menu-list">
          {flavors.map((flavor, index) => (
            <li key={index}>
              {flavor.name}
              <span className="ingredient-icon">ℹ️
                <span className={`ingredient-tooltip ${index >= flavors.length - 6 ? 'tooltip-above' : ''}`}>
                  <strong>Ingredients:</strong>
                  <ul>
                    {flavor.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
