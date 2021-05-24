import './styles/themes/default/theme.scss';
import { Route, Switch } from 'react-router-dom';
/*---------------------Pages------------------------*/
import Home from './pages/Home'
import Play from './pages/Play'
import Questions from './pages/Questions'
import DragAndDrop  from './pages/DragAndDrop'
import ListDragAndDrop from './pages/ListDragAndDrop'
import Check  from './pages/Check'

const App = () => {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/"><Home theme="code"/></Route>
          {/*---------------------Technology-Routes-------------------*/}
          <Route path="/technology/home"><Home theme="technology"/></Route>
          <Route path="/technology/play"><Play theme="technology"/></Route>
          <Route path="/technology/questions"><Questions theme="technology"/></Route>
          <Route path="/technology/drag-and-drop"><DragAndDrop theme="technology"/></Route>
          <Route path="/technology/list-drag-and-drop"><ListDragAndDrop theme="technology"/></Route>
          <Route path="/technology/check"><Check theme="technology"/></Route>
           {/*---------------------Culture-Routes----------------------*/}
           <Route path="/culture/home"><Home theme="culture"/></Route>
          <Route path="/culture/play"><Play theme="culture"/></Route>
          <Route path="/culture/questions"><Questions theme="culture"/></Route>
          <Route path="/culture/drag-and-drop"><DragAndDrop theme="culture"/></Route>
          <Route path="/culture/list-drag-and-drop"><ListDragAndDrop theme="culture"/></Route>
          <Route path="/culture/check"><Check theme="culture"/></Route>
          {/*---------------------Automotive-Routes------------------------*/}
          <Route path="/automotive/home"><Home theme="automotive"/></Route>
          <Route path="/automotive/play"><Play theme="automotive"/></Route>
          <Route path="/automotive/questions"><Questions theme="automotive"/></Route>
          <Route path="/automotive/drag-and-drop"><DragAndDrop theme="automotive"/></Route>
          <Route path="/automotive/list-drag-and-drop"><ListDragAndDrop theme="automotive"/></Route>
          <Route path="/automotive/check"><Check theme="automotive"/></Route> 
          {/*---------------------Code-Routes------------------------*/}
          <Route path="/code/home"><Home theme="code"/></Route>
          <Route path="/code/play"><Play theme="code"/></Route>
          <Route path="/code/questions"><Questions theme="code"/></Route>
          <Route path="/code/drag-and-drop"><DragAndDrop theme="code"/></Route>
          <Route path="/code/list-drag-and-drop"><ListDragAndDrop theme="code"/></Route>
          <Route path="/code/check"><Check theme="code"/></Route>
          {/*---------------------History-Routes----------------------*/}
          <Route path="/history/home"><Home theme="history"/></Route>
          <Route path="/history/play"><Play theme="history"/></Route>
          <Route path="/history/questions"><Questions theme="history"/></Route>
          <Route path="/history/drag-and-drop"><DragAndDrop theme="history"/></Route>
          <Route path="/history/list-drag-and-drop"><ListDragAndDrop theme="history"/></Route>
          <Route path="/history/check"><Check theme="history"/></Route>

        </Switch>
    </div>
  );
}

export default App;
