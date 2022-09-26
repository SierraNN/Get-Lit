import { Header, Label } from "semantic-ui-react"

const KeywordList = ({ list = [] }) => {
  return (
    <Label.Group className="keyword-labels">
      <Header as='h3'>Keywords</Header>
      {list.map(({ text }, i) => <Label key={i} content={text} />)}
    </Label.Group>
  )
}

export default KeywordList