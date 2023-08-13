const subCategory = require('../json/subCategory.json');

import { ProfileStudioAPI } from "../config";

describe('SubCategory E2E Tests', () => {

    let SubCategoryId;
    let SubCategoryName;
    
    // Create a Category

    it('Category POST Request', async() => {

        const uniqueSubCategoryId = Math.floor(Math.random() * 100000);
        const uniqueSubCategoryName = "SubCategory " + Math.floor(Math.random() * 10000000);

        subCategory.subCategoryId = uniqueSubCategoryId;
        subCategory.name = uniqueSubCategoryName;

        const res =   await ProfileStudioAPI
            .post('/SubCategory')
            .send(subCategory)
            .expect(201)
            
            SubCategoryId = res.body.subCategoryId;
            SubCategoryName = res.body.name;

        expect(res.body.name).toEqual(subCategory.name)
        expect(res.body.subCategoryId).toEqual(subCategory.subCategoryId);

    })

})