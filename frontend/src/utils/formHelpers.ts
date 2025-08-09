import { IUserRegistrationRequest } from '../../../shared/user.interface';

/**
 * Safely sets nested object values in a form data structure
 * @param obj - The form data object to update
 * @param path - The dot-notation path to the property (e.g., "profileOptions.age")
 * @param value - The value to set
 * @returns A new object with the updated value
 */
export const setNestedValue = (obj: IUserRegistrationRequest, path: string, value: string | number): IUserRegistrationRequest => {
    const keys = path.split('.');
    const newObj = JSON.parse(JSON.stringify(obj)) as IUserRegistrationRequest;
    
    if (keys.length === 1) {
        // Handle top-level properties
        const key = keys[0] as keyof IUserRegistrationRequest;
        if (key in newObj) {
            (newObj as Record<keyof IUserRegistrationRequest, unknown>)[key] = value;
        }
    } else if (keys.length === 2 && keys[0] === 'profileOptions') {
        // Handle profileOptions.* properties
        const key = keys[1] as keyof IUserRegistrationRequest['profileOptions'];
        if (key in newObj.profileOptions) {
            (newObj.profileOptions as Record<keyof IUserRegistrationRequest['profileOptions'], unknown>)[key] = value;
        }
    } else if (keys.length === 3 && keys[0] === 'profileOptions' && keys[1] === 'practicingLanguage') {
        // Handle profileOptions.practicingLanguage.* properties
        const key = keys[2] as keyof IUserRegistrationRequest['profileOptions']['practicingLanguage'];
        if (key in newObj.profileOptions.practicingLanguage) {
            (newObj.profileOptions.practicingLanguage as Record<keyof IUserRegistrationRequest['profileOptions']['practicingLanguage'], unknown>)[key] = value;
        }
    }
    
    return newObj;
};
