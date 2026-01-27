import recipesPdf from '../../ice-cream-recipes.pdf';

const Recipes = () => {
  return (
    <div className="about">
      <div className="content-scroll">
        <p>
          Here's a free recipe to get you going! You can do this at home, with whatever 
          2 quart ice cream maker you like.
        </p>

        <p><strong>Recommendations:</strong></p>
        <ul>
          <li>Never add mix-ins in the ice cream maker. Instead, add them in one layer at a time when you put the ice cream in the container.</li>
          <li>Smaller additions are better. I prefer mini chocolate chips to full size.</li>
          <li>You don't need a fancy container to get started. A large yogurt container will work just as well, simply put wax paper over the top of the ice cream to prevent freezer burn.</li>
        </ul>

        <p>Enjoy!</p>

        <hr className="recipe-separator" />

        <h2>Simple Vanilla Ice Cream</h2>
        
        <p className="recipe-intro">
          This ice cream can easily be dressed up by adding your favorite chopped candies or 
          sprinkles at the end of churning.
        </p>

        <p><strong>Makes about 3½ cups</strong> (nine, ½-cup servings)</p>

        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          <li>1 cup whole milk</li>
          <li>¾ cup granulated sugar</li>
          <li>Pinch salt flakes</li>
          <li>2 cups heavy cream</li>
          <li>1 tablespoon pure vanilla extract</li>
        </ul>

        <h3>Instructions</h3>
        <ol className="instructions-list">
          <li>
            In a medium bowl, use a hand mixer on low speed or whisk to combine the milk, 
            sugar and salt until the sugar is dissolved. Stir in the heavy cream and vanilla 
            extract. Cover and refrigerate a minimum of 2 hours, preferably overnight. 
            Whisk mixture together again before continuing.
          </li>
          <li>
            Turn on the ice cream maker; pour the mixture into the frozen freezer bowl and 
            let mix until thickened, about 15 to 20 minutes. The ice cream will have a soft, 
            creamy texture. If a firmer consistency is desired, transfer the ice cream to an 
            airtight container and place in freezer for about 2 hours. Remove from freezer 
            about 15 minutes before serving.
          </li>
        </ol>

        <hr className="recipe-separator" />

        <p>
          This example is provided by Cuisinart. You can download their free recipe booklet{' '}
          <a href={recipesPdf} target="_blank" rel="noopener noreferrer" className="highlight-link">here</a>!
        </p>
      </div>
    </div>
  );
};

export default Recipes;
