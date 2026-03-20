import React from 'react'
import recipesPdf from '../../ice-cream-recipes.pdf'

const INTRO_TEXT =
  "Here's a free recipe to get you going! You can do this at home, with whatever 2 quart ice cream maker you like."

const BULLET_1 =
  'Never add mix-ins in the ice cream maker. Instead, add them in one layer at a time when you put the ice cream in the container.'
const BULLET_2 =
  'Smaller additions are better. I prefer mini chocolate chips to full size.'
const BULLET_3 =
  "You don't need a fancy container to get started. A large yogurt container will work just as well, simply put wax paper over the top of the ice cream to prevent freezer burn."

const INSTRUCTION_1 =
  'In a medium bowl, use a hand mixer on low speed or whisk to combine the milk, sugar and salt until the sugar is dissolved. Stir in the heavy cream and vanilla extract. Cover and refrigerate a minimum of 2 hours, preferably overnight. Whisk mixture together again before continuing.'
const INSTRUCTION_2 =
  'Turn on the ice cream maker; pour the mixture into the frozen freezer bowl and let mix until thickened, about 15 to 20 minutes. The ice cream will have a soft, creamy texture. If a firmer consistency is desired, transfer the ice cream to an airtight container and place in freezer for about 2 hours. Remove from freezer about 15 minutes before serving.'

const Recipes = (): React.ReactElement => {
  return React.createElement(
    'div',
    { className: 'about' },
    React.createElement(
      'div',
      { className: 'content-scroll' },
      React.createElement('p', null, INTRO_TEXT),
      React.createElement('p', null, React.createElement('strong', null, 'Recommendations:')),
      React.createElement(
        'ul',
        null,
        React.createElement('li', null, BULLET_1),
        React.createElement('li', null, BULLET_2),
        React.createElement('li', null, BULLET_3),
      ),
      React.createElement('p', null, 'Enjoy!'),
      React.createElement('hr', { className: 'recipe-separator' }),
      React.createElement('h2', { id: 'recipe-1' }, 'Simple Vanilla Ice Cream'),
      React.createElement(
        'p',
        { className: 'recipe-intro' },
        'This ice cream can easily be dressed up by adding your favorite chopped candies or sprinkles at the end of churning.',
      ),
      React.createElement(
        'p',
        null,
        React.createElement('strong', null, 'Makes about 3½ cups'),
        ' (nine, ½-cup servings)',
      ),
      React.createElement('h3', null, 'Ingredients'),
      React.createElement(
        'ul',
        { className: 'ingredients-list' },
        React.createElement('li', null, '1 cup whole milk'),
        React.createElement('li', null, '¾ cup granulated sugar'),
        React.createElement('li', null, 'Pinch salt flakes'),
        React.createElement('li', null, '2 cups heavy cream'),
        React.createElement('li', null, '1 tablespoon pure vanilla extract'),
      ),
      React.createElement('h3', null, 'Instructions'),
      React.createElement(
        'ol',
        { className: 'instructions-list' },
        React.createElement('li', null, INSTRUCTION_1),
        React.createElement('li', null, INSTRUCTION_2),
      ),
      React.createElement('hr', { className: 'recipe-separator' }),
      React.createElement(
        'p',
        null,
        'This example is provided by Cuisinart. You can download their free recipe booklet ',
        React.createElement(
          'a',
          {
            href: recipesPdf,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'highlight-link',
          },
          'here',
        ),
        '!',
      ),
    ),
  )
}

export default Recipes

