import { propertyRepo } from "../repositories/property.repo.js";
import { uploadToCloudinary } from "../utils/middleware/cloudinary.js";
import pLimit from "p-limit";

export const propertyService = {
  createProperty: async (data) => {
    const limit = pLimit(1);

    const thumbnail = data?.files["thumbnail"]
      ? data?.files["thumbnail"][0]
      : null;

    const images = data?.files["images"] ? data?.files["images"] : [];

    const { secure_url, public_id } = await uploadToCloudinary({
      localPath: thumbnail.path,
      folder: "escaperental/properties/thumbnails",
      resourceType: "image",
    });

    const allImages = await Promise.all(
      images.map((image) =>
        limit(() => {
          return uploadToCloudinary({
            localPath: image.path,
            folder: "escaperental/properties/images",
            resourceType: "image",
          });
        }),
      ),
    );

    const urls = allImages?.map((image) => {
      return { secureUrl: image.secure_url, publicId: image.public_id };
    });

    const thumbnailData = { publicId: public_id, secureUrl: secure_url };

    const propertyData = {
      host: data?.userId.userId,
      category: data?.data.category,
      title: data?.data.title,
      description: data?.data.description,
      roomType: data?.data.roomType,
      address: data?.data.address,
      city: data?.data.city,
      state: data?.data.state,
      country: data?.data.country,
      postalCode: data?.data.postalCode,
      location: data?.data.location,
      guests: data?.data.guests,
      amenities: data?.data.amenities,
      pricing: data?.data.pricing,
      bookingRules: data?.data.bookingRules,
      houseRules: data?.data.houseRules,
      thumbnail: thumbnailData,
      images: urls,
    };

    const property = await propertyRepo.create(propertyData);
    return property;
  },
  updateProperty: async () => {},
  deleteProperty: async () => {},
  getProperty: async () => {},
  getAllProperties: async () => {},
};
