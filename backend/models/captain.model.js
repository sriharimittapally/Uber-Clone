const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = mongoose.Schema({
        fullname: {
          firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be atleast 3 characters"],
          },
          lastname: {
            type: String,
            minlength: [3, "Last name must be atleast 3 characters"],
          },
        },
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          minlength: [5, "Email must be atleast  5 characters long"],
        },
        password:{
          type:String,
          reuired:true,
          select: false,
        },
        socketId:{
          type: String,
        },
        status:{
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive'
        },
        
        //vehicle
        vehicle:{
            color:{ 
                type: String,
                required: true,
                minlength:[3, 'Color must be at least 3  characters long'],
            },
            plate:{
                type:String,
                required: true,
                minlength: [3, "Email must be atleast  3 characters long"],
            },
            capacity:{
                type: Number,
                required: true,
                minlength: [1, "Email must be atleast  1 characters long"],
            },
            vehicleType:{
                type: String,
                required: true,
                enum: ['car', 'motorcycle', 'auto']
            }
        },

        location:{
            ltd:{
                type: Number,
            },
            lng:{
                type: Number,
            }
        }

      });
      
      captainSchema.methods.generateAuthToken = function () {
          const token = jwt.sign({_id: this.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
          return token;
      }
      
      captainSchema.methods.comparePassword = async function (password) {
          return await bcrypt.compare(password, this.password );
      }
      
      captainSchema.statics.hashPassword = async function (password) {
          return await bcrypt.hash(password, 10);
      }
      
      const captainModel = mongoose.model('captain', captainSchema);
      
      module.exports = captainModel;
