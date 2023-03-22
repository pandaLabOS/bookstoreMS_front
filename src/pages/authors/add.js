import * as React from 'react';

const AuthorForm = () => {
    const [author, setAuthor] = useState({
      title: '',
      author: '',
      year: '',
      image: '',
      isbn: '',
      price: ''
    });
  
    const handleChange = (e) => {
      setAuthor({
        ...author,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(author);
    };
  
    return (
      <Form onSubmit={handleSubmit}>

        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <Label htmlFor="author">Author:</Label>
        <Input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />

        <Label htmlFor="year">Year:</Label>
        <Input
          type="text"
          id="year"
          name="year"
          value={book.year}
          onChange={handleChange}
          required
        />

        <Label htmlFor="image">Image:</Label>
        <Input
          type="text"
          id="image"
          name="image"
          value={book.image}
          onChange={handleChange}
          required
        />

        <Label htmlFor="isbn">ISBN:</Label>
        <Input
          type="text"
          id="isbn"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          required
        />

        <Label htmlFor="price">Price:</Label>
        <Input
          type="text"
          id="price"
          name="price"
          value={book.price}
          onChange={handleChange}
          required
        />

        <Button type="submit">Submit</Button>

      </Form>
    );
  };
  
  export default autgorsForm;

