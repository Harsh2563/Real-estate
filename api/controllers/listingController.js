import Listing from '../models/listingModel.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        const newList = await Listing.create(req.body);
        res.status(200).json(newList);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async(req,res,next)=> {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404,'Listing not found'));
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401,'You can delete only your own listing'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing deleted successfully");
       
    } catch (error) {
        next(error);
    }
}

export const updateListing = async(req,res,next)=> {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404,'Listing not found'));
    }

    try {
        const updatedList = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedList);
    } catch (error) {
        next(error);
    }
}

export  const getListing = async(req,res,next)=> {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) {
            next(errorHandler(404,'Listing not found'));
        }

        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const offer = req.query.offer === 'true';
    const furnished = req.query.furnished === 'true';
    const parking = req.query.parking === 'true';
    const type = req.query.type || 'all';

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type: type === 'all' ? { $in: ['sale', 'rent'] } : type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

