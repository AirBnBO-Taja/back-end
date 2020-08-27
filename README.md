## Questions / Comments/ Concerns - jfadelli@gmail.com

### Dummy Data Credentials
- Username = bob@gmail.com
- Password = 12345

### API ENDPOINTS
- Welcome Page: https://airbnb-be-1.herokuapp.com/
    - returns a welcome page

    ### USER Register
    #   POST = /api/auth/register
        *all fields are required
         _______Params______
        | name     = string |
        | email    = string |
        | password = string |

    ### USER Login
    #   POST = /api/auth/login
        *all fields are required
         _______Params______    
        | email    = string |
        | password = string |

    ### Properties
    #   POST = /api/properties 
        *all fields are required
         __________Params__________
        | street_address  = string |
        | city            = string |
        | zip             = string |
        | bedrooms        = string |
        | beds            = string |
        | guests_included = string |
        | minumum_nights  = string |
        | maximum_nights  = string |
        | bathrooms:      = string |
        | accomodates:    = string |

    #   GET route = /api/properties

    #   PUT route = /api/properties/:id
        - Can define as few as one key/value pair
        - Must define an ID as suffix on URL
         __________Params__________
        | street_address  = string |
        | city            = string |
        | zip             = string |
        | bedrooms        = string |
        | beds            = string |
        | guests_included = string |
        | minumum_nights  = string |
        | maximum_nights  = string |
        | bathrooms:      = string |
        | accomodates:    = string |

    #   DELETE = /api/properties/:id
        - Must define an ID as suffix on URL














