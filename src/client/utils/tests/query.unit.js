import { assert, expect } from 'chai';
import query from '../query';

// Sample data
const data = {
  'pages': [
    {
      'title': 'About',
      'description': 'All about us.',
      'date': '10-08-2015'
    },
    {
      'title': 'Contact',
      'description': 'Get in touch with us on 555555.',
      'date': '10-15-2015'
    }
  ],
  'products': [
    {
      'title': 'Jumper',
      'description': 'Description of said jumper',
      'date': '10-08-2015'
    },
    {
      'title': 'Skateboard',
      'description': 'Description of said Skateboard, it comes with a free hat.',
      'date': '10-15-2015'
    },
    {
      'title': 'Sunnies',
      'description': 'Description of some sunglasses.',
      'date': '10-15-2015'
    }
  ]
};

describe('query', () => {

  /**
   * Test the query function by searching for a non-existant page
   */
  it('should return an empty array when no result are found', () => {
    const results = query(data.pages, 'non-existant');

    expect(results).to.be.empty;
  });

  /**
   * Test the query function by searching for a page
   */
  it('should return a page from an array', () => {
    const results = query(data.products, 'Skateboard');

    assert.deepEqual(results[0].object, data.products[1]);
  });

  /**
   * Test the query function by searching for a product
   */
  it('should return a product from an array', () => {
    const results = query(data.pages, '555555');

    assert.deepEqual(results[0].object, data.pages[1]);
  });

  /**
   * Test the query function by searching for products
   */
  it('should return multiple products from an array', () => {
    const results = query(data.products, 'said');

    expect(results).to.have.lengthOf(2);

    // Check that we have the correct results
    assert.deepEqual(results[0].object, data.products[0]);
    assert.deepEqual(results[1].object, data.products[1]);
  });

});
