import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    dogName: '',
    age: '',
    breed: '',
    description: '',
    ownerName: '',
    phone: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [successful, setSuccessful] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic required field validation
    if (!formData.dogName) newErrors.dogName = "Dog Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.breed) newErrors.breed = "Breed is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.ownerName) newErrors.ownerName = "Owner's Name is required";

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\+?\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone Number is not valid";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Address is not valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://152.94.163.198:30003/api/adoption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      setSuccessful(true);
    } catch (error) {
      setSuccessful(false);
    }
    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <h2>Give Your Dog for Adoption</h2>
      {submitted ? (
        successful ? (
          <div className="alert alert-success" role="alert">
            Thank you! We have received your submission.
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            Sorry, we failed to submit your form. Please try again later.
          </div>
        )
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <h4>About Your Dog</h4>
              <div className="form-group">
                <label htmlFor="dogName">Dog Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="dogName"
                  name="dogName"
                  value={formData.dogName}
                  onChange={handleChange}
                  required
                />
                {errors.dogName && <div className="text-danger">{errors.dogName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                {errors.age && <div className="text-danger">{errors.age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                  type="text"
                  className="form-control"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                />
                {errors.breed && <div className="text-danger">{errors.breed}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
                {errors.description && <div className="text-danger">{errors.description}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <h4>About You</h4>
              <div className="form-group">
                <label htmlFor="ownerName">Owner's Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
                {errors.ownerName && <div className="text-danger">{errors.ownerName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;
