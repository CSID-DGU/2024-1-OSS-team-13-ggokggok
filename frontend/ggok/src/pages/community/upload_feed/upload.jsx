import { useState } from "react";
import { styled } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid #C5D8A4;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  width: 100%;
  resize: none;
 
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #A3CCAA;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function upload() {
  const [isLoading, setLoading] = useState(false);
  const [text, settext] = useState("");
  const [file, setFile] = useState(null);
  const onChange = (e) => {
    settext(e.target.value);
  };
  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1 && files[0].size < 1024*1024) {
      setFile(files[0]);
    }else{
        alert(`Please select one file that is 1MB or less.`);
    }
  };
  



  const onSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
        "place_id" : "int",
        "id" : "int",
        "placepost_title" : "string",
        "placepost_review" : "int",
        "placepost_content" : text,
        "placepost_category" : "int",
        "placepost_public" : "boolean",
        "placepost_date" : "timestamp"
    };

    console.log(postData);

    axios.post('http://localhost:8000/api/community/post{id}', postdata)
    .then(response => {
      console.log('Post successful:', response.data);
    })
    .catch(error => {
      console.error('Error posting:', error);
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={text}
        placeholder="장소에 대한 솔직한 글을 작성해주세요!"
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post text"}
      />
    </Form>
  );
}