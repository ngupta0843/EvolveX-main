import { AutoComplete } from "antd";
const options = [
  {
    value: "Algebra",
  },
  {
    value: "Biology",
  },
  {
    value: "US History",
  },
  {
    value: "US Government",
  },
  {
    value: "Geometry",
  },
  {
    value: "Physics",
  },
  {
    value: "Spanish",
  },

];

const SearchSubjects = () => (
  <AutoComplete
    style={{
      width: "100%",
      marginTop: 50,
    }}
    options={options}
    placeholder="Select a Subject"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);
export default SearchSubjects;
