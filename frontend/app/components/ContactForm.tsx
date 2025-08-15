import { useState } from "react";
import CustomPortableText from "./PortableText";
import { PortableTextBlock, stegaClean } from "next-sanity";
import cn from "classnames";
import { snakeCaseToTitleCase } from "../../../shared/utils/text";
import { ExtractPageBuilderType } from "@/sanity/lib/types";

type ContactFormProps = {
  block: ExtractPageBuilderType<"contactForm">
  index: number;
};

export default function ContactForm({ block }: ContactFormProps) {
  const { heading, body, requiredFields = [], optionalFields = [], successMessage } = block;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

   if(!requiredFields.length) {
    return null
  }
  

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const getFieldType = (field: string) => {
    const cleanField = stegaClean(field)
    if (cleanField === 'email') return 'email';
    if (cleanField === 'phone') return 'tel';
    if (cleanField.includes('_text')) return 'text';

    return 'input';
  };

  const renderField = (field: string, isRequired: boolean = false) => {
    const type = getFieldType(field);
    const value = formData[field] || '';

    if (type === 'text') {
      return (
        <div key={field} className="col-span-full">
          <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
            {snakeCaseToTitleCase(field)} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <textarea
            id={field}
            name={field}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            required={isRequired}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f50] focus:border-[#f50]"
            placeholder={`Enter your ${snakeCaseToTitleCase(field)}`}
          />
        </div>
      );
    }

    return (
      <div key={field} className="col-span-6 sm:col-span-3">
        <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
          {snakeCaseToTitleCase(field)} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={field}
          name={field}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          required={isRequired}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f50] focus:border-[#f50]"
          placeholder={`Enter your ${snakeCaseToTitleCase(field)}`}
        />
      </div>
    );
  };


  if(isSubmitting) {
    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-200">
        <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#f50]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if(submitted) {
    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-200">
         {successMessage && (
            <CustomPortableText className="!text-[#f50]" value={successMessage as PortableTextBlock[]} />
         )} 
      </div>
    )
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          {heading && (
            <h2 className="w-full text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              {heading}
            </h2>
          )}
          {body && (
            <div className="text-lg text-gray-600">
              <CustomPortableText value={body as PortableTextBlock[]} />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-6 gap-4">
            {/* Required Fields */}
            {requiredFields.map(field => renderField(field, true))}
            
            {/* Optional Fields */}
            {(optionalFields || [])
              .filter(field => {
                const cleanField = stegaClean(field)
                return requiredFields.map(stegaClean).indexOf(cleanField) === -1
              })
              .map(field => renderField(field, false))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "px-8 py-3 text-base font-medium text-white bg-[#f50] rounded-md shadow-sm hover:bg-[#f50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f50] transition-colors duration-200",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 