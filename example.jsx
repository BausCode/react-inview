import React, { Component } from 'react'
import ReactDom from 'react-dom'
import ReactInview from './src/inview.jsx';

class MyComponent extends Component {

 render () {
    const inView = this.props.elementIsInView;

    // Change classname based on boolean
    const viewClassName = (inView)? 'is--inview-true' : 'is--inview-false';

    return (
      <div className={viewClassName}>
        <span>{viewClassName}</span>
        { (inView)?
          <h1>React InView - InView</h1>
        :
          <h1>React InView - Not InView!!</h1>
        }
      </div>
    );
  }
}

const InviewOptions = {offsetY: 0.6, showGuides: true};
const InviewComponent = ReactInview(InviewOptions)(MyComponent);


class LargeComponent extends Component {

 render () {
    const inView = this.props.elementIsInView;

    // Change classname based on boolean
    const viewClassName = (inView)? 'is--inview-true' : 'is--inview-false';

    return (
      <div className={viewClassName}>
        <span>{viewClassName}</span>
        <div style={{width: '100%', height: "700px"}} > This is a giant box!! {viewClassName}</div>
      </div>
    );
  }
}


const LargeInviewOptions = {offsetY: 0.6, showGuides: true, fullElementInView: false};
const LargeInviewComponent = ReactInview(LargeInviewOptions)(LargeComponent);

class Example extends React.Component {
  render () {
    return (
      <div style={{'paddingBottom': '10000px'}}>
          <h1>React InView Example</h1>
          <p>Lorem ipsum dolor sit amet, cu vim choro latine suavitate. His aperiam scripserit in. Usu an rebum malis, vis molestie delicata id, ius eu graeco fabellas accommodare. Id libris omnium usu, ius utamur deleniti percipit no, vide munere complectitur vel eu. Ne nihil voluptaria elaboraret mei, duo justo reprehendunt ad, pro in autem euismod equidem. Fabellas interpretaris sea no.</p>
          <p>Usu atqui dicam ut. Prima porro cetero ei eum. Temporibus deterruisset et nec, ut prima inciderint eam, pro at aliquip expetenda. Dolorum delectus antiopam in qui, no sint singulis atomorum qui. Vis natum feugiat maiestatis at, vix maiorum copiosae in. Sed in erat utinam audire, ex vis numquam consulatu sententiae, clita vocent deserunt ut est. Cu veri facer saperet duo, vis id torquatos interpretaris.</p>
          <p>Lorem tation antiopam cu eum, solet laudem omnium nec in. Tale alterum ei usu, ne vis meliore gloriatur, te duis elaboraret has. No falli inimicus duo. Fierent praesent mediocrem ut has. Mea ex sumo minimum, sint epicurei explicari an mel, in vix vide disputando.</p>
          <p>Diceret habemus argumentum sit ne, ei his errem nobis virtute. Te autem dicam mel, error tollit diceret ea duo, per nusquam lucilius te. Eu mel tation nonumes iracundia, an hinc elit omnes nec. Ut vel iisque fabellas.</p>

          <p>Lorem ipsum dolor sit amet, cu vim choro latine suavitate. His aperiam scripserit in. Usu an rebum malis, vis molestie delicata id, ius eu graeco fabellas accommodare. Id libris omnium usu, ius utamur deleniti percipit no, vide munere complectitur vel eu. Ne nihil voluptaria elaboraret mei, duo justo reprehendunt ad, pro in autem euismod equidem. Fabellas interpretaris sea no.</p>
          <p>Usu atqui dicam ut. Prima porro cetero ei eum. Temporibus deterruisset et nec, ut prima inciderint eam, pro at aliquip expetenda. Dolorum delectus antiopam in qui, no sint singulis atomorum qui. Vis natum feugiat maiestatis at, vix maiorum copiosae in. Sed in erat utinam audire, ex vis numquam consulatu sententiae, clita vocent deserunt ut est. Cu veri facer saperet duo, vis id torquatos interpretaris.</p>
          <p>Lorem tation antiopam cu eum, solet laudem omnium nec in. Tale alterum ei usu, ne vis meliore gloriatur, te duis elaboraret has. No falli inimicus duo. Fierent praesent mediocrem ut has. Mea ex sumo minimum, sint epicurei explicari an mel, in vix vide disputando.</p>
          <p>Diceret habemus argumentum sit ne, ei his errem nobis virtute. Te autem dicam mel, error tollit diceret ea duo, per nusquam lucilius te. Eu mel tation nonumes iracundia, an hinc elit omnes nec. Ut vel iisque fabellas.</p>

          <InviewComponent/>
          <p>Lorem ipsum dolor sit amet, cu vim choro latine suavitate. His aperiam scripserit in. Usu an rebum malis, vis molestie delicata id, ius eu graeco fabellas accommodare. Id libris omnium usu, ius utamur deleniti percipit no, vide munere complectitur vel eu. Ne nihil voluptaria elaboraret mei, duo justo reprehendunt ad, pro in autem euismod equidem. Fabellas interpretaris sea no.</p>
          <p>Usu atqui dicam ut. Prima porro cetero ei eum. Temporibus deterruisset et nec, ut prima inciderint eam, pro at aliquip expetenda. Dolorum delectus antiopam in qui, no sint singulis atomorum qui. Vis natum feugiat maiestatis at, vix maiorum copiosae in. Sed in erat utinam audire, ex vis numquam consulatu sententiae, clita vocent deserunt ut est. Cu veri facer saperet duo, vis id torquatos interpretaris.</p>
          <p>Lorem tation antiopam cu eum, solet laudem omnium nec in. Tale alterum ei usu, ne vis meliore gloriatur, te duis elaboraret has. No falli inimicus duo. Fierent praesent mediocrem ut has. Mea ex sumo minimum, sint epicurei explicari an mel, in vix vide disputando.</p>
          <p>Diceret habemus argumentum sit ne, ei his errem nobis virtute. Te autem dicam mel, error tollit diceret ea duo, per nusquam lucilius te. Eu mel tation nonumes iracundia, an hinc elit omnes nec. Ut vel iisque fabellas.</p>

          <p>Lorem ipsum dolor sit amet, cu vim choro latine suavitate. His aperiam scripserit in. Usu an rebum malis, vis molestie delicata id, ius eu graeco fabellas accommodare. Id libris omnium usu, ius utamur deleniti percipit no, vide munere complectitur vel eu. Ne nihil voluptaria elaboraret mei, duo justo reprehendunt ad, pro in autem euismod equidem. Fabellas interpretaris sea no.</p>
          <p>Usu atqui dicam ut. Prima porro cetero ei eum. Temporibus deterruisset et nec, ut prima inciderint eam, pro at aliquip expetenda. Dolorum delectus antiopam in qui, no sint singulis atomorum qui. Vis natum feugiat maiestatis at, vix maiorum copiosae in. Sed in erat utinam audire, ex vis numquam consulatu sententiae, clita vocent deserunt ut est. Cu veri facer saperet duo, vis id torquatos interpretaris.</p>
          <p>Lorem tation antiopam cu eum, solet laudem omnium nec in. Tale alterum ei usu, ne vis meliore gloriatur, te duis elaboraret has. No falli inimicus duo. Fierent praesent mediocrem ut has. Mea ex sumo minimum, sint epicurei explicari an mel, in vix vide disputando.</p>
          <p>Diceret habemus argumentum sit ne, ei his errem nobis virtute. Te autem dicam mel, error tollit diceret ea duo, per nusquam lucilius te. Eu mel tation nonumes iracundia, an hinc elit omnes nec. Ut vel iisque fabellas.</p>

          <LargeInviewComponent/>
          <p>Lorem ipsum dolor sit amet, cu vim choro latine suavitate. His aperiam scripserit in. Usu an rebum malis, vis molestie delicata id, ius eu graeco fabellas accommodare. Id libris omnium usu, ius utamur deleniti percipit no, vide munere complectitur vel eu. Ne nihil voluptaria elaboraret mei, duo justo reprehendunt ad, pro in autem euismod equidem. Fabellas interpretaris sea no.</p>
          <p>Usu atqui dicam ut. Prima porro cetero ei eum. Temporibus deterruisset et nec, ut prima inciderint eam, pro at aliquip expetenda. Dolorum delectus antiopam in qui, no sint singulis atomorum qui. Vis natum feugiat maiestatis at, vix maiorum copiosae in. Sed in erat utinam audire, ex vis numquam consulatu sententiae, clita vocent deserunt ut est. Cu veri facer saperet duo, vis id torquatos interpretaris.</p>
          <p>Lorem tation antiopam cu eum, solet laudem omnium nec in. Tale alterum ei usu, ne vis meliore gloriatur, te duis elaboraret has. No falli inimicus duo. Fierent praesent mediocrem ut has. Mea ex sumo minimum, sint epicurei explicari an mel, in vix vide disputando.</p>
          <p>Diceret habemus argumentum sit ne, ei his errem nobis virtute. Te autem dicam mel, error tollit diceret ea duo, per nusquam lucilius te. Eu mel tation nonumes iracundia, an hinc elit omnes nec. Ut vel iisque fabellas.</p>
      </div>
    )
  }
}

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render((
  <Example />
), div)
