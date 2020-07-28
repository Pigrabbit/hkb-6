import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Form from "./component/Form";
import Filter from "./component/Filter";

export function App() {
    return `
    ${Header()}
    ${Navbar()}
    <section>
        ${Form()}
        ${Filter()}
    </section>
    `;
}

export default App;
