import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Education = ({ education = [], deleteEducation }) => {
  if (!education.length) {
    return <p>No education credentials added yet.</p>;
  }

  return (
    <section>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>
          {education.map(({ _id, school, degree, from, to }) => (
            <tr key={_id}>
              <td>{school}</td>
              <td className='hide-sm'>{degree}</td>
              <td>
                {formatDate(from)} - {to ? formatDate(to) : 'Now'}
              </td>
              <td>
                <button
                  onClick={() => deleteEducation(_id)}
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

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
