const categoryData = require('../json/categoryData.json');

import { ProfileStudioAPI } from "../config";

describe('Category E2E Tests', () => {

    let CategoryId;
    let CategoryName;
    
    // Create a Category

    it('Category POST Request', async() => {

        const uniqueCategoryId = Math.floor(Math.random() * 100000);
        const uniqueName = "Category " + Math.floor(Math.random() * 10000000);

        categoryData.categoryId = uniqueCategoryId;
        categoryData.name = uniqueName;

        const res =   await ProfileStudioAPI
            .post('/Category')
            .send(categoryData)
            .expect(201)
            
        CategoryId = res.body.categoryId;
        CategoryName = res.body.name;

        expect(res.body.name).toEqual(categoryData.name)
        expect(res.body.categoryId).toEqual(categoryData.categoryId);

    })

    // Get Category by ID

    it('Category GET by ID', async() => {
        const res = await ProfileStudioAPI.get(`/Category/${CategoryId}`);
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(CategoryName)
        expect(res.body.categoryId).toEqual(CategoryId);


    })

    // Update the category

    it('Category Update Request', async() => {
        const dataUpdate = {
            "categoryId": CategoryId,
            "name": "Category " + Math.floor(Math.random() * 10000000),
            "locked": false
          }
        
        const resUpdate =   await ProfileStudioAPI
            .put(`/Category/${CategoryId}`)
            .send(dataUpdate)
            .expect(204)

            CategoryName = dataUpdate.name;
            
    })


    // Get Category by ID After the update

    it('Category GET by ID', async() => {
        const res = await ProfileStudioAPI.get(`/Category/${CategoryId}`);
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(CategoryName)
        expect(res.body.categoryId).toEqual(CategoryId);

    })

     // Delete the Category

     it('Category delete Category', async() => {
        const res = await ProfileStudioAPI.delete(`/Category/${CategoryId}`);
        expect(res.statusCode).toBe(204)

    })

    // Delete the Category with non existing ID

    it('Delete the Category with non existing ID', async() => {
        const res = await ProfileStudioAPI.delete(`/Category/${CategoryId}`);
        expect(res.statusCode).toBe(404)
        expect(res.body.title).toEqual("Not Found")

    })

     // Get Category by ID After the Delete

     it('GET the Category after Delete', async() => {
        const res = await ProfileStudioAPI.get(`/Category/${CategoryId}`);
        expect(res.statusCode).toBe(204)
    })

    // Get All Categories
    it('Category GET Request', async() => {
        const getAllCategoryResponse = await ProfileStudioAPI.get('/Category');
        expect(getAllCategoryResponse.statusCode).toBe(200)

        const responseData = getAllCategoryResponse.body;
        responseData.forEach(Category => {
            expect(typeof Category.categoryId).toBe('number');
            expect(typeof Category.name).toBe('string');
            expect(typeof Category.locked).toBe('boolean');
          });

    })
})