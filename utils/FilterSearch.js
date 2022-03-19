
  
const FilterSearch = ({router, page, category,sort,search}) => {

    
     const path=router.pathname ;
      const query=router.query ;

       if(sort) query.sort=sort ;
       if(category)query.category=category ;
       if(search)query.search=search ;
       if(page)query.page=page ;


        router.push({
           pathname:path,
           query:query
       })


}

export default FilterSearch