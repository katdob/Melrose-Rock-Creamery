const About = ({ onNavigate }) => {
  return (
    <div className="about">
      <div className="content-scroll">
        <p>Welcome to Melrose Rock Creamery!</p>

        <p>We are more than a make-believe ice cream shop. We're also your local makerspace, but for frozen treats! 
          You can make and sell your ice cream here in a pop-up format. Or, you can make your recipes for our Super Scoopers 
          to serve to customers. This includes milkshakes, sundaes, floats, and more.</p>

        <p>Our tasting room is open from 10am - 2pm and 6pm - 11pm every day.</p>

        <p>To use the purely fictional facilities at Melrose Rock Creamery, you must be a member.
        We charge a monthly membership fee. See the details of using our kitchen <span className="highlight-link" onClick={() => onNavigate('membership')}>here</span>.</p>

        <p>We also have <span className="highlight-link">rules</span> and <span className="highlight-link">qualifications</span> that you must abide by to be a member. <span className="highlight-link">Apply now</span>!</p>
      </div>
    </div>
  );
};

export default About;
