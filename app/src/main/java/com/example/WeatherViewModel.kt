package com.example

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.network.GeocodingResult
import com.example.network.RetrofitClient
import com.example.network.WeatherResponse
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed class WeatherUiState {
    object Initial : WeatherUiState()
    object Loading : WeatherUiState()
    data class Success(
        val city: String,
        val weather: WeatherResponse
    ) : WeatherUiState()
    data class Error(val message: String) : WeatherUiState()
}

class WeatherViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<WeatherUiState>(WeatherUiState.Initial)
    val uiState: StateFlow<WeatherUiState> = _uiState.asStateFlow()

    fun searchCity(cityName: String) {
        if (cityName.isBlank()) return
        
        viewModelScope.launch {
            _uiState.value = WeatherUiState.Loading
            try {
                val geocodingResponse = RetrofitClient.geocodingService.searchCity(cityName)
                if (geocodingResponse.isSuccessful) {
                    val results = geocodingResponse.body()?.results
                    if (!results.isNullOrEmpty()) {
                        val location = results[0]
                        fetchWeather(location)
                    } else {
                        _uiState.value = WeatherUiState.Error("City not found. Please verify spelling and try again.")
                    }
                } else {
                    _uiState.value = WeatherUiState.Error("Failed to search city: ${geocodingResponse.message()}")
                }
            } catch (e: Exception) {
                _uiState.value = WeatherUiState.Error("Network error. Please check your connection.")
            }
        }
    }

    private suspend fun fetchWeather(location: GeocodingResult) {
        try {
            val weatherResponse = RetrofitClient.weatherService.getWeather(
                latitude = location.latitude,
                longitude = location.longitude
            )
            if (weatherResponse.isSuccessful && weatherResponse.body() != null) {
                _uiState.value = WeatherUiState.Success(
                    city = "${location.name}${if (location.country != null) ", ${location.country}" else ""}",
                    weather = weatherResponse.body()!!
                )
            } else {
                _uiState.value = WeatherUiState.Error("Failed to fetch weather data.")
            }
        } catch (e: Exception) {
            _uiState.value = WeatherUiState.Error("Network error while fetching weather data.")
        }
    }
}
