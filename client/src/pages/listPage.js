import Form from "../component/Form";
import Filter from "../component/Filter";
import Ledger from "../component/Ledger";

export default function ListPage() {
    return `
        ${Form()}
        ${Filter()}
        ${Ledger()}
    `
}