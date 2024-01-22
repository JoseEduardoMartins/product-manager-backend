import Repository from './repository.model';

export class UserDataBase {
    id;
    name;
    birthdate;
    phone;
    tax_id;
    email;
    password;
    photo;
    is_active;
    is_verified;
    is_deleted;
    created_at;
    updated_at;
    deleted_at;
    address_id;

    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.birthdate = user.birthdate;
        this.phone = user.phone;
        this.tax_id = user.taxId;
        this.email = user.email;
        this.password = user.password;
        this.photo = user.photo;
        this.is_active = user.isActive;
        this.is_verified = user.isVerified;
        this.is_deleted = user.isDeleted;
        this.created_at = user.createdAt;
        this.updated_at = user.updatedAt;
        this.deleted_at = user.deletedAt;
        this.address_id = user.addressId;
    }

    getNonNullFields() {
        return {
            ...(this.id !== undefined && { id: this.id }),
            ...(this.name !== undefined && { name: this.name }),
            ...(this.birthdate !== undefined && { birthdate: this.birthdate }),
            ...(this.phone !== undefined && { phone: this.phone }),
            ...(this.tax_id !== undefined && { tax_id: this.tax_id }),
            ...(this.email !== undefined && { email: this.email }),
            ...(this.password !== undefined && { password: this.password }),
            ...(this.photo !== undefined && { photo: this.photo }),
            ...(this.is_active !== undefined && { is_active: this.is_active }),
            ...(this.is_verified !== undefined && { is_verified: this.is_verified }),
            ...(this.is_deleted !== undefined && { is_deleted: this.is_deleted }),
            ...(this.created_at !== undefined && { created_at: this.created_at }),
            ...(this.updated_at !== undefined && { updated_at: this.updated_at }),
            ...(this.deleted_at !== undefined && { deleted_at: this.deleted_at }),
            ...(this.address_id !== undefined && { address_id: this.address_id }),
        };
    }
}

export class UserApi {
    id;
    name;
    birthdate;
    phone;
    taxId;
    email;
    password;
    photo;
    isActive;
    isVerified;
    isDeleted;
    createdAt;
    updatedAt;
    deletedAt;
    addressId;

    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.birthdate = user.birthdate;
        this.phone = user.phone;
        this.taxId = user.tax_id;
        this.email = user.email;
        this.password = user.password;
        this.photo = user.photo;
        this.isActive = user.is_active;
        this.isVerified = user.is_verified;
        this.isDeleted = user.is_deleted;
        this.createdAt = user.created_at;
        this.updatedAt = user.updated_at;
        this.deletedAt = user.deleted_at;
        this.addressId = user.address_id;
    }

    getNonNullFields() {
        return {
            ...(this.id !== undefined && { id: this.id }),
            ...(this.name !== undefined && { name: this.name }),
            ...(this.birthdate !== undefined && { birthdate: this.birthdate }),
            ...(this.phone !== undefined && { phone: this.phone }),
            ...(this.taxId !== undefined && { taxId: this.taxId }),
            ...(this.email !== undefined && { email: this.email }),
            ...(this.password !== undefined && { password: this.password }),
            ...(this.photo !== undefined && { photo: this.photo }),
            ...(this.isActive !== undefined && { isActive: this.isActive }),
            ...(this.isVerified !== undefined && { isVerified: this.isVerified }),
            ...(this.isDeleted !== undefined && { isDeleted: this.isDeleted }),
            ...(this.createdAt !== undefined && { createdAt: this.createdAt }),
            ...(this.updatedAt !== undefined && { updatedAt: this.updatedAt }),
            ...(this.deletedAt !== undefined && { deletedAt: this.deletedAt }),
            ...(this.addressId !== undefined && { addressId: this.addressId }),
        };
    }
}

export default { UserDataBase, UserApi };
