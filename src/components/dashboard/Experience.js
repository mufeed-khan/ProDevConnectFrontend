// src/components/profile/Experience.js

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Experience = ({ experience, deleteExperience }) => {
  if (!Array.isArray(experience) || experience.length === 0) {
    return <p>No experience credentials found.</p>;
  }

  return (
    <section>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>
          {experience.map(({ _id, company, title, from, to }) => (
            <tr key={_id}>
              <td>{company}</td>
              <td className='hide-sm'>{title}</td>
              <td>
                {formatDate(from)} - {to ? formatDate(to) : 'Now'}
              </td>
              <td>
                <button
                  type='button'
                  onClick={() => deleteExperience(_id)}
                  className='btn btn-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
